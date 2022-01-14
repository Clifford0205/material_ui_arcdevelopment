import { createTheme } from '@material-ui/core/styles';
// https://v4.mui.com/zh/customization/theming/

const arcBlue = '#0B72b9';
const arcOrange = '#FFbA60';

// https://v4.mui.com/zh/customization/default-theme/
export default createTheme({
  palette: {
    common: {
      blue: `${arcBlue}`,
      orange: `${arcOrange}`,
    },
    primary: {
      main: `${arcBlue}`,
    },
    secondary: {
      main: `${arcOrange}`,
    },
  },
  //   https://v4.mui.com/zh/components/typography/
  typography: {
    h3: {
      fontWeight: 300,
    },
    tab: {
      fontFamily: 'Raleway',
      // 不要讓他全部轉大寫
      textTransform: 'none',
      fontWeight: 700,
      fontSize: '1rem',
    },
    estimate: {
      fontFamily: 'Pacifico',
      fontSize: '1rem',
      textTransform: 'none',
      color: 'white'
    },
  },
});
