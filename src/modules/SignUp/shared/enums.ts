export enum FORM_DATA_FIELD {
  last_name = 'last_name',
  first_name = 'first_name',
  full_name = 'full_name',
  phone = 'phone',
  gender_id = 'gender_id',
  address = 'address',
  probation_period = 'probation_period',
  enterprise_name = 'enterprise_name',
  city_id = 'city_id',
  district_id = 'district_id',
  email = 'email',
  password = 'password',
  new_password = 'new_password',
  remember_me = 'remember_me',
  confirmed_password = 'confirmed_password',
  receive_news = 'receive_news',
  level = 'level',
  field = 'field',
  verify_code = 'code',
  avatar = 'avatar',
}

export enum ENTERPRISE_FORM {
  id = 'id',
  name = 'name',
  abbreviation_name = 'abbreviation_name',
  address = 'address',
  scale_id = 'scale_id',
  city_id = 'city_id',
  district_id = 'district_id',
  ward_id = 'ward_id',
  map_url = 'map_url',
  phone = 'phone',
  career_field_id = 'career_field_id',
  website_url = 'website_url',
  introduce = 'introduce',
  user_id = 'user_id',
  avatar = 'avatar',
  represent = 'represent',
  plan = 'plan',
  phone_verified = 'phone_verified',
}

// enum getopt type
export enum GET_OTP_TYPE {
  SIGNUP = 1,
  CHANGE_ENTERPRISE_PHONE = 2,
  CHANGE_REPRESENT_PHONE = 3,
}
