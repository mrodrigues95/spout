import { UserError } from '~/__generated__/schema.generated';

interface Props {
  title: string;
  error?: Error | UserError;
}

const AuthError = ({ title, error }: Props) => {
  if (!error) return null;

  return (
    <div className="rounded-md bg-red-50 border-2 border-red-500 border-opacity-50 p-4 space-y-1">
      {title && <h3 className="text-sm font-bold text-red-800">{title}</h3>}
      <div className="text-sm font-medium text-red-700">{error.message}</div>
    </div>
  );
};

export default AuthError;
