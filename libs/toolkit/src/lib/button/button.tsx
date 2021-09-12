/* eslint-disable-next-line */
export interface ButtonProps {}

export function Button(props: ButtonProps) {
  return (
    <div className="text-red-500 hover:text-red-200 hover:shadow-md">
      <h1>Welcome to Button!</h1>
    </div>
  );
}

export default Button;
