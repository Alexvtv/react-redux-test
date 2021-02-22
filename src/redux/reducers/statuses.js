const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SAVE_DATA': {
      const { data } = action.payload;
      return data.statuses
    }
    default:
      return state
  }
}
