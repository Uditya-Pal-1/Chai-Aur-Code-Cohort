export const schemaOptions = {
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: (_document, value) => {
      value.id = value._id.toString();
      delete value._id;
      return value;
    },
  },
};
