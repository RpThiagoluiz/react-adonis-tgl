import { GameTypesProps } from "../../@types/GameTypes";
import { inputFormatValue } from "../../utils";

import { InputGame, Container } from "./styles";
interface AppGameInputNumbersProps {
  gameChoice: GameTypesProps;
  selectedNumbers: string[];
  handlerInputValue: (event: any) => void;
}

export const AppGameInputNumbers = ({
  gameChoice,
  handlerInputValue,
  selectedNumbers,
}: AppGameInputNumbersProps) => {
  // const verifyNumber = (num: number) : boolean => {
  //   const resp = numbers.find(number => formateNumber(number) === formateNumber(num));
  //   return resp ? true : false
  // };

  const existsNumber = (value: number): boolean => {
    const checkNumbers = selectedNumbers.find(
      (values) => inputFormatValue(Number(values)) === inputFormatValue(value)
    );
    return checkNumbers ? true : false;
  };

  const gameBetNumbers = () => {
    const { range } = gameChoice;
    let gameRangeInputs = [];
    for (let index = 1; index <= range; index++) {
      const formatedNumber = inputFormatValue(index);
      gameRangeInputs.push(
        <InputGame
          key={index}
          isActive={existsNumber(index)}
          type="text"
          name=""
          value={formatedNumber}
          className="grid-bet-container-range-input"
          onClick={handlerInputValue}
          readOnly
        />
      );
    }

    return gameRangeInputs;
  };

  return <Container>{gameBetNumbers()}</Container>;
};
