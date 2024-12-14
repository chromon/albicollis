// Color themes

export interface Theme {
    colors: {
        primary: string;
        secondary: string;
        tertiary: string;
        quaternary: string;
        text: string;
        background: string;
    }
}

export const lightTheme: Theme = {
    colors: {
        // main color
        primary: '#1573FF',
        // border color
        secondary: '#ECEDF1',
        // icon color
        tertiary: '#717882',
        quaternary: '',
        text: '#000000',
        background: '#FFFFFF',
    }
};

export const darkTheme: Theme = {
    colors: {
        // main color
        primary: '#1573FF',
        // border color
        secondary: '#03dac4',
        // icon color
        tertiary: '',
        quaternary: '',
        text: '#ffffff',
        background: '#000000',
    }
};

export const natureTheme: Theme = {
    colors: {
        // main color
        primary: '#606467',
        // border color
        secondary: '#DCD5C2',
        // icon color
        tertiary: '#60636A',
        // tools bar bg color
        quaternary: '#F7F1D9',
        // main text color
        text: '#000000',
        // main bg color
        background: '#F7F1D9',
    }
};

export const nightTheme: Theme = {
    colors: {
        // main color
        primary: '',
        // tools bar border color
        secondary: '#3E3E3E',
        // icon color
        tertiary: '#60636A',
        // tools bar bg color
        quaternary: '#1C1C1C',
        // main text color
        text: '#959595',
        // main bg color
        background: '#000000',
    }
};