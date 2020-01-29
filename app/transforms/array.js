import Transform from '@ember-data/serializer/transform';
import { isNone, isBlank, typeOf } from '@ember/utils';

export default Transform.extend({
  deserialize(value) {
    if (isNone(value)) return null;
    if (isBlank(value)) return [];

    return typeOf(value) === 'array' ? value : [value];
  },

  serialize(value) {
    if (isNone(value)) return null;
    if (isBlank(value)) return [];

    return typeOf(value) === 'array' ? value : [value];
  }
});
