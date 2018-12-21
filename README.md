# layermanager
Layer manager plugin for Origo. The plugin depends on web services for retrieving metaddata and Origo data.

#### Example usage of Layermanager as plugin
The plugin can be loaded like this in an html-file:
```
        <script src="js/origo.min.js"></script>
        <script src="/build/js/lm.js"></script>
        <script type="text/javascript">
            var origo = Origo('config file.json');
            origo.on('load', function(viewer) {

                var lm = Layermanager({
                  target: document.getElementById(viewer.getMain().getId()),
                  url: 'http://localhost/metadatakatalog/api/layers',
                  sourceUrl: 'http://localhost/origo-db/layers',
                  sourceFields: {
                    description: {
                        name: 'BESKRIVNING',
                        searchable: true
                    },
                    title: {
                        name: 'NAMN',
                        searchable: true
                    },
                    layerId: {
                        name: 'Layer_id'
                    },
                    type: {
                        name: 'TYP'
                    },
                    tags: {
                        name: 'tags',
                        searchable: true
                    }
                  }
                });
                viewer.addComponent(lm);
                
            });
        </script>
```
