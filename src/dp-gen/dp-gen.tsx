import styles from "./dp.gen.module.scss";
import React from "react";
import Logo from "../assets/log.png";

import Doodle from "./../assets/illustrations/right-doodle.png";
import Move from "./../assets/illustrations/move-icon.png";
import Cup from "./../assets/illustrations/cup-code.png";

import * as htmlToImage from "html-to-image";
import { ArrowRotateRight, DocumentDownload } from "iconsax-react";

// import ShareIcon from "@/images/share-icon.svg";

interface Props {
  name: string;
  theme: string;
  photo: string | null;
  handleRegenerate: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DpGen: React.FC<Props> = ({
  name,
  photo,
  theme,
  handleRegenerate,
}) => {
  const sectionRef = React.useRef<HTMLElement | null>(null);

  const [loading, setLoading] = React.useState(false);

  // HTML2canvas implementation
  const handleDownload = () => {
    setLoading(true);
    if (sectionRef.current) {
      const sectionElement = sectionRef.current;

      const loadImages = () => {
        const imageElements = Array.from(
          sectionElement.querySelectorAll("img, svg")
        );

        return Promise.allSettled<void>(
          imageElements.map((img) => {
            return new Promise<void>((resolve) => {
              if (
                img instanceof HTMLImageElement ||
                img instanceof SVGImageElement
              ) {
                img.onload = () => resolve();
                img.dispatchEvent(new Event("load"));
              } else {
                resolve();
              }
            });
          })
        );
      };

      loadImages().then(() => {
        // All images have loaded, proceed to capture the section with html2canvas
        // html2canvas(sectionElement, { scale: 4, useCORS: true }).then(
        //   (canvas) => {
        //     // Get the canvas as a data URL with maximum quality
        //     const image = canvas.toDataURL("image/png", 1.0);

        //     // Create a download link for the captured image
        //     const downloadLink = document.createElement("a");
        //     downloadLink.href = image;
        //     downloadLink.download = `${name}-devfest-2023.png`;
        //     downloadLink.click();
        //   }
        // );

        const node = document.getElementById("exporting") as HTMLElement;
        htmlToImage
          .toPng(node)
          .then(function (dataUrl) {
            const link = document.createElement("a");
            link.download = `${name} DevFest Kivu`;
            link.href = dataUrl;
            link.click();
            setLoading(false);
          })
          .catch(function (error) {
            console.error("oops, something went wrong!", error);
            alert("oops, Il y a une erreur!");
            setLoading(false);
          });
      });
    }
  };

  const handleRedo = () => handleRegenerate(false);

  return (
    <>
      <h6 className={styles.preview_text}>
        Si vous ne voyez pas votre photo, veuillez recharger la page ou cliquez
        sur le bouton "Regenerer"
      </h6>

      <div className={styles.main_container} id="exporting">
        <section
          ref={sectionRef}
          className={`
     ${styles.dp_gen_section}
     ${
       theme === "Vert"
         ? styles.green
         : theme === "Bleu"
         ? styles.blue
         : theme === "Jaune"
         ? styles.yellow
         : theme === "Rouge"
         ? styles.red
         : ""
     }
     `}
        >
          <div className={styles.overlay}>
            <div className={styles.box1}></div>
            <div className={styles.box2}></div>
            <div className={styles.content}>
              <div className={styles.img_holder}>
                <div className={styles.doodle_1}>
                  <img src={Doodle} alt="Doodle" />
                </div>
                <div className={styles.doodle_2}>
                  <img src={Move} alt="Move" />
                </div>
                <figure className={styles.doodle_3}>
                  <img src={Cup} alt="Cup" />
                </figure>
                {photo && (
                  <>
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    >
                      <img
                        width={340}
                        height={340}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                          borderRadius: "50%",
                        }}
                        src={photo as string}
                        alt={name}
                      />
                    </div>
                  </>
                )}
                <div className={styles.name}> 😇 {name}</div>
              </div>
              <div className={styles.be_there}>VOUS INVITE AU </div>

              <div className={styles.logo_container}>
                <img src={Logo} alt="Devfest Kivu" className={styles.logo} />
              </div>

              <ul className={styles.group}>
                <li className={styles.list}>
                  <div className={styles.name}>Réservation 🎫</div>
                  <div className={styles.value}>https://bit.ly/devkivu</div>
                </li>
                <li className={styles.list}>
                  <div className={styles.name}>Date</div>
                  <div className={styles.value}>02 Dec.</div>
                </li>
                <li className={styles.list}>
                  <div className={styles.name}>Lieu</div>
                  <div className={styles.value}>Salle INPP</div>
                </li>
              </ul>
              {/* Footer */}
            </div>
          </div>
        </section>
      </div>
      <section className="w-full bg-[#333] rounded-md pb-4 mt-4 p-6 z-50">
        <div className="flex justify-between gap-3">
          {/* <PrimaryButton className={styles.btn_solid}>
            <ShareIcon /> Share
          </PrimaryButton> */}
          <button
            onClick={handleDownload}
            className="
            bg-primary p-3  rounded-md bg-green-400 font-bold active:bg-green-600 text-white transition-all flex items-center gap-2 
            "
          >
            <DocumentDownload size="24" color="#fff" />
            <span className="hidden md:block">Télecharger</span>
            {/* Download icon */}
            {loading && (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 text-gray-200 animate-spin  fill-green-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </button>

          <button
            onClick={handleRedo}
            className="bg-primary p-3  rounded-md bg-red-600 font-bold text-white flex items-center gap-2 transition-all active:bg-red-700"
          >
            <ArrowRotateRight size="24" color="#fff" />
            <span className="hidden md:block">Regenerer</span>
          </button>
        </div>
      </section>
    </>
  );
};
