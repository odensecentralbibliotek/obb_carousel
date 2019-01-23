<?php
function obb_carousel_list_admin_form($form, &$form_state) {
    
    $form['obb_material_count_display_fieldset'] = array(
		'#type' => 'fieldset',
		'#title' => t('Antal element visninger'),
		'#tree' => FALSE,
	);
    $form['Material count display']['obb_pc_display_count'] = array(
      '#type' => 'textfield',
      '#default_value' => variable_get('obb_pc_display_count', 8),
      '#title' => t('Antal materialer vist på pc'),
      '#attributes' => array(
          'placeholder' => t('Antal materialer vist på pc '),
      ),
      '#description' => t('Antal materialer vist på pc'),
     );
    
    $form['Material count display']['obb_tablet_display_count'] = array(
      '#type' => 'textfield',
      '#default_value' => variable_get('obb_tablet_display_count', 8),
      '#title' => t('Antal materialer vist på tablet'),
      '#attributes' => array(
          'placeholder' => t('Antal materialer vist på tablet '),
      ),
      '#description' => t('Antal materialer vist på tablet'),
    );
    
    $form['Material count display']['obb_mobile_display_count'] = array(
      '#type' => 'textfield',
      '#default_value' => variable_get('obb_mobile_display_count', 4),
      '#title' => t('Antal materialer vist på mobile'),
      '#attributes' => array(
          'placeholder' => t('Antal materialer vist på mobile '),
      ),
      '#description' => t('Antal materialer vist på mobile'),
    );
    
    $form['obb_material_image_style_display_fieldset'] = array(
		'#type' => 'fieldset',
		'#title' => t('Image style visninger'),
		'#tree' => FALSE,
	);
    
}
