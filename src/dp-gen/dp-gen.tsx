import styles from "./dp.gen.module.scss";
import React from "react";
import Logo from "../assets/log.png";

import Doodle from "./../assets/illustrations/right-doodle.png";
import Move from "./../assets/illustrations/move-icon.png";
import Cup from "./../assets/illustrations/cup-code.png";

// import ShareIcon from "@/images/share-icon.svg";

import html2canvas from "html2canvas";

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

  // HTML2canvas implementation
  const handleDownload = () => {
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
        html2canvas(sectionElement, { scale: 4, useCORS: true }).then(
          (canvas) => {
            // Get the canvas as a data URL with maximum quality
            const image = canvas.toDataURL("image/png", 1.0);

            // Create a download link for the captured image
            const downloadLink = document.createElement("a");
            downloadLink.href = image;
            downloadLink.download = `${name}-devfest-2023.png`;
            downloadLink.click();
          }
        );
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

      <div className={styles.main_container}>
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
              <div className={styles.be_there}>PARTICIPERA AU </div>

              <div className={styles.logo_container}>
                <img src={Logo} alt="Devfest Kivu" className={styles.logo} />
              </div>

              <ul className={styles.group}>
                <li className={styles.list}>
                  <div className={styles.name}>Réservation ticket</div>
                  <div className={styles.value}>devfestkivu.com</div>
                </li>
                <li className={styles.list}>
                  <div className={styles.name}>Date</div>
                  <div className={styles.value}>02 Dec 2023</div>
                </li>
                <li className={styles.list}>
                  <div className={styles.name}>Lieu</div>
                  <div className={styles.value}>Salle INPP (labotte)</div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="w-full bg-slate-900 mt-4 p-6 z-50">
          <div className="flex justify-between ">
            {/* <PrimaryButton className={styles.btn_solid}>
            <ShareIcon /> Share
          </PrimaryButton> */}
            <button
              onClick={handleDownload}
              className="
            bg-primary p-3  rounded-md bg-green-400 font-bold active:bg-green-600 text-white transition-all 
            "
            >
              Télecharger
              {/* Download icon */}
            </button>

            <button
              onClick={handleRedo}
              className="bg-primary p-3  rounded-md bg-red-600 font-bold text-white"
            >
              Regenerer
            </button>
          </div>
        </section>
      </div>
    </>
  );
};
