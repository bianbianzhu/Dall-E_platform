import { FormFieldNames, IFormStates } from '../../../constants/interfaces';

interface IProps {
  label: string;
  type: string;
  placeholder: string;
  name: FormFieldNames;
  value: string;
  handleChange:
    | React.Dispatch<Partial<IFormStates>>
    | ((input: string) => void);
  isGrouped?: boolean;
  isSurpriseMe?: boolean;
  handleSurpriseMe?: () => void;
}

const FormField = ({
  label,
  type,
  placeholder,
  name,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
  isGrouped,
}: IProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    return isGrouped
      ? (handleChange as React.Dispatch<Partial<IFormStates>>)({
          [e.target.name]: e.target.value,
        })
      : (handleChange as (input: string) => void)(e.target.value);
  };

  return (
    <fieldset>
      <div className="mb-3 flex items-center gap-2">
        <label
          htmlFor={`formField__${name}`}
          className="block text-sm font-medium text-gray-900"
        >
          {label}
        </label>
        {isSurpriseMe ? (
          <button
            type="button"
            className="rounded-sm bg-defaultGrey px-2 py-1 text-xs font-semibold capitalize text-fontDefault transition-all hover:translate-y-[-1px]"
            onClick={handleSurpriseMe}
          >
            surpise me
          </button>
        ) : null}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        id={`formField__${name}`}
        name={name}
        onChange={onChangeHandler}
        required
        className="broder-gray-300 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-fontDefault outline-none focus:border-purple focus:ring-purple"
      />
    </fieldset>
  );
};

FormField.defaultProps = {
  isSurpriseMe: false,
  handleSurpriseMe: () => null,
  isGrouped: false,
};

export default FormField;
