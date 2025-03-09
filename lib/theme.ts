import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-montserrat), Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#c0ff00',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {},
      },
    },
  },
});

export default theme;
