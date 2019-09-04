<?php
/**
 * Created by PhpStorm.
 * User: kartik
 * Date: 2019-09-04
 * Time: 11:43
 */

namespace Bookings\Extensions {

    use SilverStripe\Core\Extension;
    use SilverStripe\Forms\FormAction;
    use SilverStripe\Forms\TextareaField;
    use SilverStripe\Forms\TextField;

    /**
     * Class FormFieldDefault_Extensions
     * @package Bookings\Extensions
     * Add default classes to silverstripe forms
     */
    class FormFieldDefault_Extensions extends Extension
    {
        /**
         * @param $attributes
         */
        public function updateAttributes(&$attributes){
            $owner = $this->getOwner();
            if($owner instanceof TextField || $owner instanceof TextareaField){
                $attributes['class'] = $attributes['class'] . ' form-control';
            }elseif ($owner instanceof FormAction){
                $attributes['class'] = $attributes['class'] . ' btn btn-primary';
            }
        }
    }
}