/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@apollo/client';
import { useAccessToken } from '@nhost/nextjs';
import dynamic from 'next/dynamic';
import router from 'next/router';
import { useState } from 'react';
import { EditorProps, EditorState } from 'react-draft-wysiwyg';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form';
import toast from 'react-hot-toast';

import Input from '@/components/forms/Elements/Input';
import TextArea from '@/components/forms/Elements/TextArea';

import { UPDATE_BLOG_ONE } from '@/graphql/blogs/mutations';
import { READ_BLOGS } from '@/graphql/blogs/queries';
import { ADMIN_STORE_CATEGORIES } from '@/routes/paths';
const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

interface IEditBlogsProviderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

type FormValues = {
  title: string;
  excerpt: string;
  blog: string;
};

export default function EditBlogsProvider({ data }: IEditBlogsProviderProps) {
  const accessToken = useAccessToken();

  const { id, title, excerpt, blog } = data;

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const methods = useForm<FormValues>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      title,
      excerpt,
      blog,
    },
  });

  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
  };

  const { handleSubmit, control } = methods;

  const { isDirty } = useFormState({
    control,
  });

  const [updateBlogByPk, { loading }] = useMutation(UPDATE_BLOG_ONE, {
    refetchQueries: [{ query: READ_BLOGS }],
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { title, excerpt } = data;

    try {
      await updateBlogByPk({
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
        variables: { id, title, excerpt },
      });
      toast.success('Blog updated', { id: 'artist-updated' });
      router.replace(ADMIN_STORE_CATEGORIES, undefined, { shallow: true });
    } catch (error) {
      toast.error('Something went wrong, please try again', { id: 'error' });
    }
  };

  return (
    <div className='max-w-4xl'>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-0'>
          <Input
            id='title'
            label='Blog title'
            validation={{
              required: 'Blog title is required',
              minLength: {
                value: 3,
                message: 'Blog title is too short',
              },
              maxLength: {
                value: 30,
                message: 'Blog title is too long',
              },
            }}
          />
          <TextArea
            id='excerpt'
            label='Excerpt'
            validation={{
              required: 'Excerpt is required',
              minLength: {
                value: 20,
                message: 'Excerpt is too short',
              },
              maxLength: {
                value: 3000,
                message: 'Excerpt is too long',
              },
            }}
          />
          <div className='py-4'>
            <label className='text-sm'>Write your blog</label>
            <Editor
              editorState={editorState}
              wrapperClassName='wrapperClassName'
              editorClassName='border border-gray-200 rounded-lg px-2 bg-white'
              onEditorStateChange={onEditorStateChange}
            />
          </div>
          <button
            disabled={loading || !isDirty}
            className={`btn-primary btn-block btn my-6 ${
              loading ? 'loading' : null
            }`}
            type='submit'
          >
            SAVE
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
