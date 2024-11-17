export const styles = {
  // Layout
  container: "flex flex-col items-center gap-8 p-6",
  toolContainer: "flex flex-col gap-6 w-full max-w-3xl mx-auto p-6 bg-background/50 backdrop-blur-sm rounded-lg shadow-lg border border-blue-500/10",
  toolDescription: "mb-8 text-center",

  // Image container
  imageContainer: "relative w-full aspect-video flex items-center justify-center bg-background/30 rounded-lg overflow-hidden border border-blue-500/10",
  imageDimensions: "absolute top-2 right-2 rounded-md bg-gray-900/80 px-3 py-1.5 text-xs text-white backdrop-blur",
  image: "max-w-full max-h-full object-contain",

  // Upload box
  uploadBox: {
    container: "w-full max-w-2xl mx-auto",
    inner: "relative flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-blue-500/20 bg-blue-500/[0.02] p-8 text-center hover:border-blue-400/30 transition-colors duration-200",
    iconContainer: "flex items-center justify-center w-14 h-14 rounded-full bg-blue-500/[0.08] text-blue-200",
    title: "text-xl font-semibold text-white tracking-tight",
    subtitle: "mt-1 text-sm text-blue-200/80 tracking-wide",
    buttonContainer: "flex flex-col items-center gap-3 mt-2",
    uploadButton: "px-5 py-2 text-sm font-medium text-blue-100 bg-blue-500/10 rounded-lg border border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/30 transition-all duration-200",
    dragText: "text-sm font-medium text-blue-200/70 tracking-wide",
  },

  // Controls
  controlsContainer: "flex flex-col gap-4 w-full",
  optionsContainer: "flex flex-col gap-6",
  optionGroup: "flex flex-col gap-2",
  formLabel: "block text-sm font-medium text-blue-100/90 mb-1",
  optionsGrid: "grid grid-cols-1 sm:grid-cols-2 gap-4",
  colorPicker: "w-full h-10 rounded-lg cursor-pointer bg-transparent border border-blue-500/20",
  optionsSlider: "w-full h-2 bg-blue-500/10 rounded-lg appearance-none cursor-pointer accent-blue-500",

  // Option buttons
  optionButton: {
    base: "w-full px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
    selected: "bg-blue-500/20 text-blue-200 border border-blue-500/40 shadow-lg shadow-blue-500/10",
    unselected: "bg-blue-500/10 text-blue-100 border border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/30",
  },

  // Buttons
  buttonsContainer: "flex flex-wrap gap-4 justify-center",
  primaryButton: "px-6 py-2 text-white rounded-lg font-medium shadow-lg transition-all duration-200 hover:opacity-90 active:scale-[0.98]",
  secondaryButton: "px-6 py-2 bg-blue-500/10 text-blue-100 rounded-lg font-medium border border-blue-500/20 transition-all duration-200 active:scale-[0.98]",

  // Utility
  label: "block text-sm font-medium text-blue-100/90 mb-1",
  slider: "w-full h-2 bg-blue-500/10 rounded-lg appearance-none cursor-pointer accent-blue-500",
  sliderValue: "text-sm text-blue-200/80 text-center",
  hidden: "hidden",
};
