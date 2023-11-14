import React, { createRef, useState } from "react";
import { DpGen } from "./dp-gen/dp-gen";
import { FaArrowRight } from "react-icons/fa";

import bg from "./assets/bg.png";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import RadioComponent from "./RadioComponent";

function App() {
  const [previewMode, setPreview] = useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [name, setName] = React.useState("");
  const [selectedColor, setSelectedColor] = React.useState("");
  const [isCropped, setIsCropped] = React.useState<boolean>(false);

  // Crop img

  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef<ReactCropperElement>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
    setIsCropped(true);
    setImage("");
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(event.target.value);
  };

  const handleSubmit = () => {
    setPreview(!previewMode);
  };

  return (
    <>
      <header
        className="
      w-[90%] md:w-3/4 mx-auto mt-3 rounded-lg overflow-hidden flex justify-center items-center
    lg:max-h-96"
      >
        <img src={bg} alt="Devfest" className="w-full" />
      </header>
      <div
        className="
        w-full mx-auto mt-3 bg-[#222]
      "
      >
        <div className=" w-[90%] md:w-3/4 mx-auto mt-3">
          {!previewMode ? (
            <section className="pt-12 w-full md:w-3/5 mx-auto">
              <div className="">
                <h4 className="text-4xl font-bold text-[#ffe991]">
                  Personnalisez votre affiche DevFest
                </h4>
                <form className="w-full mt-3">
                  <div
                    className="
                  w-full flex flex-col gap-3
                "
                  >
                    <label className="text-[#fff7]">
                      <div>Votre nom :</div>
                    </label>
                    <input
                      className="p-3 rounded-lg  outline-none border-2 border-gray-700  focus:border-gray-600 text-white bg-[#333]  "
                      type="text"
                      required
                      placeholder="Votre nom"
                      value={name}
                      name="name"
                      maxLength={15}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  {!image && !isCropped && (
                    <div className="w-full mt-5">
                      <label className="flex text-[#fff7] justify-between">
                        <div>Votre image :</div>
                        <div>De préference une image en carrée</div>
                      </label>

                      <div className="flex items-center justify-center w-full mt-2">
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Cliquez ici</span>{" "}
                              ou faites glisser votre image
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>
                          <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            ref={inputRef}
                            onChange={onChange}
                            accept="image/*"
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  <div>
                    {image.length > 0 && (
                      <Cropper
                        ref={cropperRef}
                        style={{ height: 400, width: "100%" }}
                        initialAspectRatio={1}
                        preview=".img-preview"
                        src={image}
                        viewMode={1}
                        minCropBoxHeight={10}
                        minCropBoxWidth={10}
                        background={false}
                        responsive={true}
                        guides={true}
                        autoCropArea={1}
                        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                        className="mt-5 rounded-md overflow-hidden"
                      />
                    )}

                    <div className="w-3/5 mx-auto mt-8">
                      {isCropped && (
                        <img
                          className="rounded-full mt-9"
                          src={cropData}
                          alt="cropped"
                        />
                      )}
                    </div>
                    <div className="flex justify-center gap-5 mt-7">
                      {image.length > 0 && !isCropped && (
                        <button
                          className="
                      bg-primary p-3  rounded-md bg-green-400 font-bold
                      "
                          type="button"
                          onClick={getCropData}
                        >
                          Enreigistrer
                        </button>
                      )}
                      <button
                        className="bg-primary p-3  rounded-md bg-red-600"
                        onClick={() => {
                          setImage("");
                          setIsCropped(false);
                        }}
                        type="button"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className="text-[#fff7]">
                      <div>Choisissez votre couleur préferée</div>
                    </label>
                    <div className="flex justify-between">
                      <RadioComponent
                        nom="Vert"
                        color="#45da74"
                        handleChange={handleRadioChange}
                      />
                      <RadioComponent
                        nom="Bleu"
                        color="#466ce0"
                        handleChange={handleRadioChange}
                      />
                      <RadioComponent
                        nom="Jaune"
                        color="#e0b746"
                        handleChange={handleRadioChange}
                      />
                      <RadioComponent
                        nom="Rouge"
                        color="#f96355"
                        handleChange={handleRadioChange}
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="bg-primary p-3 py-4 mb-8 mt-7 w-full bg-[#FFFCF2] rounded-md font-bold text-[#222] cursor-pointer disabled:opacity-50"
                    type="submit"
                    disabled={!name || !selectedColor || !isCropped}
                  >
                    Générer votre affiche
                    {/* <ArrowRight /> */}
                    <FaArrowRight className="inline-block ml-2" />
                  </button>
                </form>
              </div>
            </section>
          ) : (
            <div className="mt-4 ">
              <DpGen
                handleRegenerate={setPreview}
                name={name}
                theme={selectedColor}
                photo={cropData}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
