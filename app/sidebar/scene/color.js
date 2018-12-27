
const HEX_REGEX = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;

export const isValidHexColor = (color) => (
    HEX_REGEX.test(color)
)
