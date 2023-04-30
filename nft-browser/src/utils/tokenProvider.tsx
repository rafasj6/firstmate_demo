import { createContext, useCallback, useContext, useState } from "react";
import { TokenInfo } from "./constants";

type TokensTrackingData = {
  tokensTracking: TokenInfo[];
  initializeTokens: (tokens: TokenInfo[]) => void;
  addToken: (token: TokenInfo) => void;
  deleteToken: (token: TokenInfo) => void;
};

export const TokensTrackingContext = createContext<TokensTrackingData>({
  tokensTracking: [],
  addToken: () => {
    throw new Error("Cannot call addToTokensTracking() outside of TokensTrackingContext");
  },
  initializeTokens: () => {
    throw new Error("Cannot call initializeTokensTracking() outside of TokensTrackingContext");
  },
  deleteToken: () => {
    throw new Error("Cannot call deleteFromTokensTracking() outside of TokensTrackingContext");
  },
});

export const TokensTrackingContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tokensTracking, setTokensTracking] = useState<TokenInfo[]>([]);

  const addToTokensTracking = useCallback((tokenInfo: TokenInfo) => {
    setTokensTracking((prevTokensTracking) => {
      const updatedTokensTracking = [tokenInfo,...prevTokensTracking];
      
      return updatedTokensTracking;
    });
  }, []);

  const initializeTokensTracking = useCallback((tokens: TokenInfo[]) => {
    console.log(tokens)
    setTokensTracking(tokens);
  }, []);

  const deleteFromTokensTracking = useCallback((tokenToRemove: TokenInfo) => {
    setTokensTracking((prevTokensTracking) => {
      const updatedTokensTracking = prevTokensTracking.filter(
        (token) => token.collectionId !== tokenToRemove.collectionId || token.tokenId !== tokenToRemove.tokenId
      );
      return updatedTokensTracking;
    });
  }, []);

  return (
    <TokensTrackingContext.Provider
      value={{ tokensTracking, addToken: addToTokensTracking, deleteToken: deleteFromTokensTracking,initializeTokens: initializeTokensTracking }}>
      {children}
    </TokensTrackingContext.Provider>
  );
};

export const useTokensTrackingContext = () => useContext(TokensTrackingContext);
