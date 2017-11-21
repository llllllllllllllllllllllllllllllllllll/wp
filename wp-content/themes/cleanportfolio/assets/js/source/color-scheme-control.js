/* global colorScheme, Color */
/**
 * Add a listener to the Color Scheme control to update other color controls to new values/defaults.
 * Also trigger an update of the Color Scheme CSS when a color is changed.
 */

( function( api ) {
	var cssTemplate = wp.template( 'cleanportfolio-color-scheme' ),
		colorSchemeKeys = [
			'background_color',
			'page_background_color',
			'secondary_background_color',
			'third_background_color',
			'button_background_color',
			'button_hover_background_color',
			'main_text_color',
			'title_color',
			'link_color',
			'secondary_text_color',
			'third_text_color',
			'button_text_color',
		],
		colorSettings = [
			'background_color',
			'page_background_color',
			'secondary_background_color',
			'third_background_color',
			'button_background_color',
			'button_hover_background_color',
			'main_text_color',
			'title_color',
			'link_color',
			'secondary_text_color',
			'third_text_color',
			'button_text_color',
		];

	api.controlConstructor.select = api.Control.extend( {
		ready: function() {
			if ( 'color_scheme' === this.id ) {
				this.setting.bind( 'change', function( value ) {
					var colors = colorScheme[value].colors;

					// Update Background Color.
					var color = colors[0];
					api( 'background_color' ).set( color );
					api.control( 'background_color' ).container.find( '.color-picker-hex' )
						.data( 'data-default-color', color )
						.wpColorPicker( 'defaultColor', color );

					// Update Page Background Color.
					color = colors[1];
					api( 'page_background_color' ).set( color );
					api.control( 'page_background_color' ).container.find( '.color-picker-hex' )
						.data( 'data-default-color', color )
						.wpColorPicker( 'defaultColor', color );

					// Update Secondary Background Color.
					color = colors[2];
					api( 'secondary_background_color' ).set( color );
					api.control( 'secondary_background_color' ).container.find( '.color-picker-hex' )
						.data( 'data-default-color', color )
						.wpColorPicker( 'defaultColor', color );

					// Update Secondary Background Color.
					color = colors[3];
					api( 'third_background_color' ).set( color );
					api.control( 'third_background_color' ).container.find( '.color-picker-hex' )
						.data( 'data-default-color', color )
						.wpColorPicker( 'defaultColor', color );

					// Update Button Background Color.
					color = colors[4];
					api( 'button_background_color' ).set( color );
					api.control( 'button_background_color' ).container.find( '.color-picker-hex' )
						.data( 'data-default-color', color )
						.wpColorPicker( 'defaultColor', color );

					// Update Button Hover Background Color.
					color = colors[5];
					api( 'button_hover_background_color' ).set( color );
					api.control( 'button_hover_background_color' ).container.find( '.color-picker-hex' )
						.data( 'data-default-color', color )
						.wpColorPicker( 'defaultColor', color );		
							
					// Update Main Text Color.
					color = colors[6];
					api( 'main_text_color' ).set( color );
					api.control( 'main_text_color' ).container.find( '.color-picker-hex' )
						.data( 'data-default-color', color )
						.wpColorPicker( 'defaultColor', color );

					// Update Title Color.
					color = colors[7];
					api( 'title_color' ).set( color );
					api.control( 'title_color' ).container.find( '.color-picker-hex' )
						.data( 'data-default-color', color )
						.wpColorPicker( 'defaultColor', color );

					// Update Link Color.
					color = colors[8];
					api( 'link_color' ).set( color );
					api.control( 'link_color' ).container.find( '.color-picker-hex' )
						.data( 'data-default-color', color )
						.wpColorPicker( 'defaultColor', color );

					// Update Secondary Text Color  
					color = colors[9];
					api( 'secondary_text_color' ).set( color );
					api.control( 'secondary_text_color' ).container.find( '.color-picker-hex' )
						.data( 'data-default-color', color )
						.wpColorPicker( 'defaultColor', color );

					// Update Third Text Color.
					color = colors[10];
					api( 'third_text_color' ).set( color );
					api.control( 'third_text_color' ).container.find( '.color-picker-hex' )
						.data( 'data-default-color', color )
						.wpColorPicker( 'defaultColor', color );

					// Button Text Color.
					color = colors[11];
					api( 'button_text_color' ).set( color );
					api.control( 'button_text_color' ).container.find( '.color-picker-hex' )
						.data( 'data-default-color', color )
						.wpColorPicker( 'defaultColor', color );
					
				} );
			}
		}
	} );

	// Generate the CSS for the current Color Scheme.
	function updateCSS() {
		var scheme = api( 'color_scheme' )(),
			css,
			colors = _.object( colorSchemeKeys, colorScheme[ scheme ].colors );

		// Merge in color scheme overrides.
		_.each( colorSettings, function( setting ) {
			colors[ setting ] = api( setting )();
		} );

		// Add additional color.
		// jscs:disable
		colors.border_color = Color( colors.main_text_color ).toCSS( 'rgba', 0.2 );
		// jscs:enable

		css = cssTemplate( colors );

		api.previewer.send( 'update-color-scheme-css', css );
	}

	// Update the CSS whenever a color setting is changed.
	_.each( colorSettings, function( setting ) {
		api( setting, function( setting ) {
			setting.bind( updateCSS );
		} );
	} );
} )( wp.customize );
