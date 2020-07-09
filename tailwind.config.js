// See https://tailwindcss.com/docs/configuration for details

module.exports = {
  theme: {
    fontFamily: {
      display: ["Poppins", "Helvetica", "Arial", "sans-serif"],
      sans: ["Roboto", "Helvetica", "Arial", "sans-serif"]
    },
    extend: {
      colors: {
        dark: "#1A1F16",
        gray: {
          "100": "#f5f5f5",
          "200": "#eeeeee",
          "300": "#e0e0e0",
          "400": "#bdbdbd",
          "500": "#9e9e9e",
          "600": "#757575",
          "700": "#616161",
          "800": "#424242",
          "900": "#212121"
        },
        primary: {
          lightest: "#868686",
          lighter: "#4a4a4a",
          default: "#000000"
        },
        accent: {
          default: "#EB4127"
        },
        brand: {
          lighter: "#269732",
          default: "#005828"
        }
      },
      borderColor: theme => ({
        ...theme("colors"),
        default: theme("colors.brand.lighter", "currentColor")
      }),
      maxHeight: {
        "80vh": "80vh"
      }
    },
    minWidth: {
      xs: "20rem",
      sm: "24rem"
    }
  },
  variants: {
    borderStyle: ["responsive", "hover"]
  },
  plugins: []
};
