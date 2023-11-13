type Props = {
  nom: string;
  color: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function RadioComponent({ nom, color, handleChange }: Props) {
  return (
    <div className="inline-flex items-center">
      <label
        className="relative flex cursor-pointer items-center rounded-full p-3"
        htmlFor={nom}
        data-ripple-dark="true"
      >
        <input
          id={nom}
          name="type"
          value={nom}
          onChange={handleChange}
          type="radio"
          className={`before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-[${color}] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[${color}] checked:before:bg-green-500 hover:before:opacity-10`}
        />
        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-pink-500 opacity-0 transition-opacity peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 16 16"
            fill={color}
          >
            <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
          </svg>
        </div>
      </label>
      <label
        className={`mt-px cursor-pointer select-none font-light`}
        style={{ color: color }}
        htmlFor={nom}
      >
        {nom}
      </label>
    </div>
  );
}
