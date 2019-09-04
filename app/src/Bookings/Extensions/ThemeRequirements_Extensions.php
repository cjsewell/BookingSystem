<?php
/**
 * Created by PhpStorm.
 * User: kartik
 * Date: 2019-09-04
 * Time: 12:04
 */

namespace Bookings\Extensions {

    use SilverStripe\Core\Extension;
    use SilverStripe\View\Requirements;

    /**
     * Class ThemeRequirements_Extensions
     * @package Bookings\Extensions
     * Requirements to default init for ss files
     */
    class ThemeRequirements_Extensions extends Extension {

        public function onBeforeInit () {
            Requirements::css('https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css');
        }
    }
}