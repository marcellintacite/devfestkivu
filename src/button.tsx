import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export default function Boutton(props: Props) {
  return (
    <button className="btn btn-primary" {...props}>
      {props.children}
    </button>
  );
}
