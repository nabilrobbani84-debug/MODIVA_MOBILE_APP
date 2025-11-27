// ========================================
// src/utils/imageCompressor.js
// ========================================
/**
 * Image compression utilities
 */
import ImageResizer from 'react-native-image-resizer';

export const imageCompressor = {
  /**
   * Compress image
   */
  compress: async (imageUri, options = {}) => {
    try {
      const {
        maxWidth = 1024,
        maxHeight = 1024,
        quality = 80,
        format = 'JPEG',
      } = options;

      const response = await ImageResizer.createResizedImage(
        imageUri,
        maxWidth,
        maxHeight,
        format,
        quality
      );

      return {
        success: true,
        uri: response.uri,
        name: response.name,
        size: response.size,
      };
    } catch (error) {
      console.error('Error compressing image:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  /**
   * Get image size
   */
  getSize: (uri) => {
    return new Promise((resolve, reject) => {
      Image.getSize(
        uri,
        (width, height) => resolve({ width, height }),
        reject
      );
    });
  },

  /**
   * Calculate compression ratio
   */
  calculateRatio: (originalSize, targetSize) => {
    if (originalSize <= targetSize) return 100;
    return Math.floor((targetSize / originalSize) * 100);
  },
};

export default imageCompressor;