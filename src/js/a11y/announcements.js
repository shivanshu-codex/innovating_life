export const SR = {
  routeChanged:     (pageName)        => `${pageName} page`,
  modalOpened:      (name)            => `${name} dialog opened`,
  modalClosed:      (name)            => `${name} dialog closed`,
  panelExpanded:    (name)            => `${name} expanded`,
  panelCollapsed:   (name)            => `${name} collapsed`,

  storiesLoaded:    (count)           => `${count} more stor${count === 1 ? 'y' : 'ies'} loaded`,
  storyResonated:   (title)           => `Resonated with "${title}"`,
  storyUnresonated: (title)           => `Removed resonance from "${title}"`,
  storySaved:       (title)           => `"${title}" saved to your bookmarks`,
  storyUnsaved:     (title)           => `"${title}" removed from bookmarks`,

  draftSaved:                           'Draft saved',
  storyPublished:   (title)           => `"${title}" published`,
  storyDeleted:                         'Story deleted',

  fieldError:       (fieldName, msg)  => `${fieldName}: ${msg}`,
  formSuccess:      (action)          => `${action} successful`,
  formSubmitting:   (action)          => `${action}…`,

  signedIn:                             'Signed in successfully. Welcome back.',
  signedOut:                            'Signed out successfully.',
  accountCreated:                       'Account created. Welcome to Lumina.',

  notifPanelOpen:                       'Notifications panel opened',
  notifMarkedRead:  (count)           => `${count} notification${count !== 1 ? 's' : ''} marked as read`,

  loading:          (what)            => `Loading ${what}…`,
  loadingComplete:  (what)            => `${what} loaded`,
  loadingError:     (what)            => `Error loading ${what}. Please try again.`,

  imageUploading:                       'Image uploading…',
  imageUploaded:                        'Image uploaded successfully',
  imageRemoved:                         'Image removed',

  copiedToClipboard:                    'Copied to clipboard',
  searchResultsCount: (n, query)      => `${n} result${n !== 1 ? 's' : ''} for "${query}"`,
  noSearchResults:    (query)         => `No results for "${query}"`,
};
