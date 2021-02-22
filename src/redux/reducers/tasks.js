const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SAVE_DATA': {
      const { data } = action.payload;
      return data.tasks
    }
    case 'LOAD_TASKS': {
    	const { data } = action.payload;
      return data
    }
    default:
      return state
  }
}
