import React, { useReducer, useState } from 'react';
import FormField from '../../components/Form/FormField/FormField';
import { fetchErrorHandler, fetchWrapper, getRandomPrompt } from '../../utils';
import {
  FormFieldNames,
  IFormStates,
  IDalleImageResponse,
  ICreateNewPostRequest,
} from '../../constants/interfaces';
import { surpriseMePrompts } from '../../constants';
import { preview } from '../../assets';
import Spinner from '../../components/Loader/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [isGeneratingImg, setIsGeneratingImg] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generateImgErrMsg, setGenerateImgErrMsg] = useState<string>('');
  const [sumbitErrMsg, setSubmitErrMsg] = useState<string>('');
  const [formStates, updateFormStates] = useReducer(
    (current: IFormStates, updated: Partial<IFormStates>) => {
      if (
        updated.image &&
        !updated.image.startsWith('data:image/jpeg;base64,')
      ) {
        updated.image = `data:image/jpeg;base64,${updated.image}`;
      }

      return { ...current, ...updated };
    },
    {
      name: '',
      prompt: '',
      image: '',
    }
  );

  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitErrMsg('');

    if (!formStates.name || !formStates.prompt || !formStates.image) {
      return alert('Please fill out all fields');
    }

    try {
      setIsLoading(true);
      await fetchWrapper<ICreateNewPostRequest>(
        `${import.meta.env.VITE_BACKEND_ENDPOINT}/posts`,
        {
          method: 'POST',
          body: formStates as unknown as BodyInit,
        }
      );

      navigate('/');
    } catch (err) {
      const errMsg = fetchErrorHandler(err);
      setSubmitErrMsg(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const surpriseMeHandler = () => {
    const randomPrompt = getRandomPrompt(formStates.prompt);
    updateFormStates({ prompt: randomPrompt });
  };

  const generateImgHandler = async () => {
    setGenerateImgErrMsg('');

    if (!formStates.prompt) {
      return alert('Please enter a prompt');
    }

    try {
      setIsGeneratingImg(true);
      const data = await fetchWrapper<IDalleImageResponse>(
        `${import.meta.env.VITE_BACKEND_ENDPOINT}/dalleImages`,
        {
          method: 'POST',
          body: { prompt: formStates.prompt } as unknown as BodyInit,
        }
      );
      updateFormStates({ image: data?.image });
    } catch (err) {
      const errMsg = fetchErrorHandler(err);
      setGenerateImgErrMsg(errMsg);
    } finally {
      setIsGeneratingImg(false);
    }
  };

  return (
    <section className="mx-auto max-w-7xl">
      <div className="create-post__title-wrapper">
        <h1 className="text-2xl font-extrabold capitalize text-fontDefault">
          create
        </h1>
        <p className="mt-2 max-w-lg text-sm text-darkGrey">
          Create imaginative and visually stunning images through DALL-E AI and
          share them with the community.
        </p>
      </div>

      <div className="create-post__form-wrapper">
        <form
          className="mt-16 flex max-w-3xl flex-col gap-5"
          onSubmit={submitHandler}
        >
          <FormField
            label="Your name"
            type="text"
            placeholder="John Doe"
            value={formStates.name}
            handleChange={updateFormStates}
            name={FormFieldNames.Name}
            isGrouped
          />
          <FormField
            label="Prompt"
            type="text"
            placeholder={surpriseMePrompts[0]}
            value={formStates.prompt}
            handleChange={updateFormStates}
            name={FormFieldNames.Prompt}
            isSurpriseMe
            handleSurpriseMe={surpriseMeHandler}
            isGrouped
          />

          <div className="create-post__preview-wrapper relative flex aspect-square w-64 items-center justify-center rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-fontDefault focus:border-blue-500 focus:ring-blue-500">
            {formStates.image ? (
              <img
                src={formStates.image}
                alt={formStates.prompt}
                className="h-full w-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="h-9/12 w-9/12 object-contain opacity-40"
              />
            )}
            {isGeneratingImg ? (
              <div className="absolute inset-0 z-0 flex items-center justify-center rounded-lg bg-blackOpacity40">
                <Spinner />
              </div>
            ) : null}
          </div>

          {generateImgErrMsg ? (
            <span className="inline-block self-start rounded-md bg-rose-500 px-2 py-1 text-sm text-white">
              {generateImgErrMsg.toUpperCase()}
            </span>
          ) : null}

          <button
            type="button"
            className="w-full self-start rounded-md bg-darkGreen px-5 py-2.5 text-center text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            onClick={generateImgHandler}
            disabled={isGeneratingImg}
          >
            {isGeneratingImg ? 'Generating...' : 'Generate'}
          </button>

          <p className="mt-7 text-sm text-darkGrey">
            Once you have created the image you want, you can share it with the
            community by clicking the button below.
          </p>

          {sumbitErrMsg ? (
            <span className="inline-block self-start rounded-md bg-rose-500 px-2 py-1 text-sm text-white">
              {sumbitErrMsg.toUpperCase()}
            </span>
          ) : null}

          <button
            type="submit"
            className="w-full self-start rounded-md bg-purple px-5 py-2.5 text-center text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            disabled={isGeneratingImg || isLoading}
          >
            {isLoading ? 'Sharing...' : 'Share with the community'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
