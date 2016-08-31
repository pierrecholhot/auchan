export const countByKey = (products, key) => {
  const data = _.countBy(products, key)
  if (data['null']) { delete data['null'] }
  return data
}
