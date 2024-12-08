import GlobalDragHandle from 'tiptap-extension-global-drag-handle'

export const GlobalDragHandleExtension = GlobalDragHandle.configure({
    dragHandleWidth: 20, // default

    // The scrollTreshold specifies how close the user must drag an element to the edge of the lower/upper screen for automatic 
    // scrolling to take place. For example, scrollTreshold = 100 means that scrolling starts automatically when the user drags an 
    // element to a position that is max. 99px away from the edge of the screen
    // You can set this to 0 to prevent auto scrolling caused by this extension
    scrollTreshold: 100, // default

    // The css selector to query for the drag handle. (eg: '.custom-handle').
    // If handle element is found, that element will be used as drag handle. 
    // If not, a default handle will be created
    dragHandleSelector: '.drag-handle', // default is undefined

    // Tags to be excluded for drag handle
    // If you want to hide the global drag handle for specific HTML tags, you can use this option.
    // For example, setting this option to ['p', 'hr'] will hide the global drag handle for <p> and <hr> tags.
    excludedTags: [], // default

    // Custom nodes to be included for drag handle
    // For example having a custom Alert component. Add data-type="alert" to the node component wrapper.
    // Then add it to this list as ['alert']
    //
    customNodes: [],
})