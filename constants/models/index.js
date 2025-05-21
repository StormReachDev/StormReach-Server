export const modelConstants = {
  user: {
    error: {
      name: {
        required: 'The "name" field is required. Please provide a value.',
        maxLength: 'The "name" field must not exceed 30 characters.',
        minLength: 'The "name" field must be at least 8 characters long.',
      },

      email: {
        required: 'The "email" field is required. Please provide a value.',
        invalid: 'The provided email is invalid. Please provide a valid email address.',
      },

      password: {
        required: 'The "password" field is required. Please provide a value.',
        minLength: 'The "password" field must be at least 8 characters long.',
        weak: 'The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
      },

      phone: {
        required: 'The "phone" field is required. Please provide a value.',
        invalid:
          'The provided phone number is invalid. Please provide a valid phone number with a country code.',
      },

      timeZone: {
        required: 'The "timeZone" field is required. Please provide a value.',
        invalid:
          'The provided timezone is invalid. Please provide a valid timezone like "Asia/Karachi" or "America/New_York".',
      },

      role: {
        required: 'The "role" field is required. Please provide a value.',
        invalid:
          'The provided role is invalid. Please provide a valid role like "user" or "admin".',
        enum: ['roofer', 'admin', 'manager', 'salesAgent', 'telemarketer'],
      },
    },
  },
}
