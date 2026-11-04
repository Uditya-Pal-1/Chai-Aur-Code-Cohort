export function getRelativeLuminance(hex: string) {
  const channels = hex.match(/[0-9a-f]{2}/gi)?.map((channel) => parseInt(channel, 16) / 255)
  if (!channels || channels.length !== 3) return 0

  const linearChannels = channels.map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  )

  return 0.2126 * linearChannels[0] + 0.7152 * linearChannels[1] + 0.0722 * linearChannels[2]
}

export function getContrastRatio(foreground: string, background: string) {
  const luminance = [getRelativeLuminance(foreground), getRelativeLuminance(background)].sort((a, b) => b - a)
  return (luminance[0] + 0.05) / (luminance[1] + 0.05)
}
