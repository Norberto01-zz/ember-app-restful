import ApplicationSerializer from '../application/serializer';
import EmbeddedRecordsMixin from 'ember-data/serializers/embedded-records-mixin';

export default ApplicationSerializer.extend(EmbeddedRecordsMixin, {
  attrs: {
    lines: { embedded: 'always'  }
  }
});
