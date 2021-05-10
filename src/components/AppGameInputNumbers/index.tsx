import { Input } from "./styles";

export const AppGameInputNumbers = () => {
  const handlerInputValue = () => {
    console.log(`click`);
  };
  return (
    <Input
      type="text"
      name=""
      //id="range-input-${index}"
      //value="${format}"
      value="10"
      className="grid-bet-container-range-input"
      onClick={handlerInputValue}
      readOnly
    />
  );
};
