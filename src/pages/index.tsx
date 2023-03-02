/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from "@hookform/resolvers/zod";
import type { NextPage } from "next";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Footer } from "y/components/Footer";
import { Hero } from "y/components/Hero";
import { ImageGrid } from "y/components/ImageGrid";
import { Loader } from "y/components/Loader";
import {
  generateDallEImageSchema,
  type GenerateDallEImageSchema,
} from "y/schemas/openai";
import { api } from "y/utils/api";

const Home: NextPage = () => {
  const generateImage = api.dalle.generate.useMutation();
  const [generatedImages, setGeneratedImages] = useState<{ url: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<GenerateDallEImageSchema>({
    resolver: zodResolver(generateDallEImageSchema),
  });

  const onFormSubmit: SubmitHandler<GenerateDallEImageSchema> = async ({
    prompt,
    quantity,
  }) => {
    setIsLoading(true);
    setGeneratedImages([]);
    try {
      const response = await generateImage.mutateAsync({
        prompt,
        quantity,
      });

      const images = response.data.map((image) => ({
        url: image.url as string,
      }));

      setGeneratedImages(images);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-y-auto bg-gray-100 px-8 pt-24">
      <Hero />
      <div className="flex-grow container mx-auto mt-24 ">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="mb-6 grid gap-6 md:grid-cols-3">
            <div className="col-span-3">
              <label
                htmlFor="prompt"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Prompt
              </label>
              <textarea
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5
              text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600
               dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                id="prompt"
                placeholder="Type a prompt to generate images ex: 'A cat is walking on the street"
                {...register("prompt")}
              />
              {errors.prompt && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.prompt.message}
                </p>
              )}
            </div>
            <div className="col-span-3 flex flex-col">
              <label
                htmlFor="quantity"
                className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Quantidade
              </label>
              <input
                type="number"
                id="quantity"
                max={9}
                min={1}
                placeholder="Number of images to generate 1 to 9"
                className="w-100 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm 
              text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700
               dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 md:w-72"
                {...register("quantity", { valueAsNumber: true })}
              />
              {errors.quantity && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.quantity.message}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium
             text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300
              disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
          >
            Submit
          </button>
        </form>

        {generatedImages.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Generated images
            </h2>
            <ImageGrid images={generatedImages} />
          </div>
        )}
        {isLoading && <Loader />}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
