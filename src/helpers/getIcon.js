// getIcon.js
// Collection of functions to get file, folder, and programming languages icons.

// Import icon images.
import { generateManifest } from 'material-icon-theme';

const iconsPath = '/icons/';
var manifestIcons = {};

// Generate icons manifest data.
export const loadIcons = () =>
{
  manifestIcons = generateManifest();
}

// Gets the icon path based on the filename.
export const getIconByFilename = ( filename ) =>
{
  var iconName = manifestIcons.fileNames[ filename.toLowerCase() ];

  if ( iconName ) return iconsPath + iconName + '.svg';
  return iconsPath + 'file.svg';
}

// Gets the folder icon path based on the foldername.
export const getIconByFoldername = ( foldername ) =>
{
  var iconName = manifestIcons.folderNames[ foldername.toLowerCase() ];

  if ( iconName ) return iconsPath + iconName + '.svg';
  return iconsPath + 'folder.svg';
}

// Gets the icon path based on a file extension.
export const getIconByExtension = ( extension ) =>
{
  var iconName = manifestIcons.fileExtensions[ extension.toLowerCase() ];

  if ( iconName ) return iconsPath + iconName + '.svg';
  return iconsPath + 'file.svg';
}

// Gets the icon path based on the programming language.
export const getIconByLanguage = ( language ) =>
{
  var iconName = manifestIcons.languageIds[ language.toLowerCase() ];

  if ( iconName ) return iconsPath + iconName + '.svg';
  return null;
}

// Gets the icon path based on the entry data.
export const getEntryIcon = ( entryName, entryType ) =>
{
  if ( entryType.toLowerCase() == "tree" ) return getIconByFoldername( entryName.toLowerCase() );
  
  var iconName = getIconByFilename( entryName.toLowerCase() );

  if ( iconName != iconsPath + 'file.svg' ) return iconName;

  var extensionIndex = entryName.indexOf( '.' );

  return getIconByExtension( entryName.slice( extensionIndex + 1 ) )
}

// Gets the programming language name based on a file extension.
export const getLanguageByExtension = ( extension ) =>
{  
  var iconName = manifestIcons.fileExtensions[ extension.toLowerCase() ];

  if ( iconName ) return iconName;
  return '';
}
