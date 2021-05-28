import { GameTypesProps } from "../../@types/GameTypes";
import { ButtonGame, Container } from "./styles";

interface AppGamesApiResponseProps {
  apiResponse: GameTypesProps[];
  gameChoice: GameTypesProps;
  handleButtonGameMode: (gameType: string) => void;
}

export const AppGamesApiResponse = ({
  apiResponse,
  gameChoice,
  handleButtonGameMode,
}: AppGamesApiResponseProps) => {
  return (
    <Container>
      {apiResponse.map((game) => (
        <ButtonGame
          key={game.type}
          color={game.color}
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            handleButtonGameMode(game.type);
          }}
          isActive={game.type === gameChoice.type}
        >
          {game.type}
        </ButtonGame>
      ))}
    </Container>
  );
};
