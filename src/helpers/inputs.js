import { ThemeProvider } from '@mui/material/styles';
import { createTheme} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: "green",
  },
});


export default function InputThemeProvider({children}){
  return(
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}