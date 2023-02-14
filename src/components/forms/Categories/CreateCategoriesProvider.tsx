/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@apollo/client';
import { useAccessToken } from '@nhost/react';
import { convertToRaw, EditorState } from 'draft-js';
import router from 'next/router';
import { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Input from '@/components/forms/Elements/Input';
import TextArea from '@/components/forms/Elements/TextArea';

import { INSERT_BLOG_ONE } from '@/graphql/blogs/mutations';
import { READ_BLOGS } from '@/graphql/blogs/queries';
import { ADMIN_BLOGS } from '@/routes/paths';

type FormValues = {
  title: string;
  excerpt: string;
};

export default function CreateBlogsProvider() {
  const accessToken = useAccessToken();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
  };

  const methods = useForm<FormValues>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const { handleSubmit } = methods;

  const [insertBlogOne, { loading }] = useMutation(INSERT_BLOG_ONE, {
    refetchQueries: [{ query: READ_BLOGS }],
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { title, excerpt } = data;
    const currentContent = editorState.getCurrentContent();
    try {
      await insertBlogOne({
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
        variables: {
          title,
          excerpt,
          blog: JSON.stringify(convertToRaw(currentContent)),
        },
      });
      toast.success(`${title} category has been added`, {
        id: 'artist-success',
      });
      router.replace(ADMIN_BLOGS, undefined, { shallow: true });
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
            disabled={loading}
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
