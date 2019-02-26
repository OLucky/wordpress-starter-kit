<?php
$theme_path = get_template_directory_uri();

function load_general_resources() {
  wp_deregister_script('jquery'); /* remove wp jquery library */

	wp_enqueue_style( 'main-style', $theme_path . '/css/styles.css');
	wp_enqueue_script( 'main-script', $theme_path . '/js/app.min.js', false, false, true );
}

add_action( 'wp_head', 'load_general_resources');


function adding_support() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
}
add_action( 'after_setup_theme', 'adding_support' );

function wpdocs_excerpt_more( $more ) {
	return '...';
}
add_filter( 'excerpt_more', 'wpdocs_excerpt_more' );

function custom_excerpt_length($length) {
	return 20;
}
add_filter( 'excerpt_length', 'custom_excerpt_length');

@ini_set( 'upload_max_size' , '64M' );
@ini_set( 'post_max_size', '64M');
@ini_set( 'max_execution_time', '300' );

?>