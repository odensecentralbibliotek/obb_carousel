<?php
if(isset($variables['lazy_image']))
{
    echo  '<div class="' . implode(' ', $variables['lazy_classes']) . '">' . $variables['lazy_image'] . '</div>';
}
?>


