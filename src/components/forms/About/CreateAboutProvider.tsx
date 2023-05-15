/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@apollo/client';
import { useAccessToken } from '@nhost/nextjs';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
import router from 'next/router';
import { useState } from 'react';

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);
import { EditorProps } from 'react-draft-wysiwyg';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Input from '@/components/forms/Elements/Input';

import { INSERT_ABOUT_ONE } from '@/graphql/about/mutations';
import { READ_ALL_ABOUT } from '@/graphql/about/queries';
import { ADMIN_ABOUT } from '@/routes/paths';

type FormValues = {
  path: string;
  name: string;
};

export default function CreateAboutProvider() {
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

  const [insertAboutOne, { loading }] = useMutation(INSERT_ABOUT_ONE, {
    refetchQueries: [{ query: READ_ALL_ABOUT }],
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { path, name } = data;
    const currentContent = editorState.getCurrentContent();
    try {
      await insertAboutOne({
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
        variables: {
          name,
          path,
          about: draftToHtml(convertToRaw(currentContent)),
        },
      });
      toast.success(`${path} has been added to about`, {
        id: 'artist-success',
      });
      router.replace(ADMIN_ABOUT, undefined, { shallow: true });
    } catch (error) {
      toast.error(
        'Something went wrong, make sure path is unique, please try again',
        { id: 'error' }
      );
    }
  };

  return (
    <div className='max-w-4xl'>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-0'>
          <Input
            id='path'
            label='Path title'
            validation={{
              required: 'Path is required',
              pattern: {
                value: /^\S+$/,
                message: 'No spaces allowed',
              },
              minLength: {
                value: 3,
                message: 'Path is too short',
              },
              maxLength: {
                value: 30,
                message: 'Path is too long',
              },
            }}
          />

          <Input
            id='name'
            label='Name | Menu title'
            validation={{
              required: 'Name is required',
              minLength: {
                value: 3,
                message: 'Name is too short',
              },
              maxLength: {
                value: 30,
                message: 'Name is too long',
              },
            }}
          />

          <div className='py-4'>
            <label className='text-sm'>Write your about text</label>
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
