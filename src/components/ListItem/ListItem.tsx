import Button from "../Button";

type BaseProps = {
  content: string;
};

type WithButton = {
  buttonContent: string;
  onClick: () => void;
};

type WithoutButton = {
  buttonContent?: undefined;
  onClick?: undefined;
};

type Props = BaseProps & (WithButton | WithoutButton);


export default function ListItem({
 content,
 buttonContent,
 onClick,
}: Props) {

  return (
    <div className="flex flex-col w-full relative my-4">
      <div className="h-16 text-lg rounded-xl border border-gray-300 bg-white px-6 py-2" />
      <span className="absolute top-1/2 -translate-y-1/2 left-4">{content}</span>
      {buttonContent && onClick && (
        <Button
          variant="square"
          className="absolute right-2 h-[40px] top-1/2 -translate-y-1/2 text-[12px]"
          onClick={onClick}
        >
          {buttonContent}
        </Button>
      )}
    </div>
  );
}
