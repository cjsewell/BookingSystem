<?php
/**
 * Created by PhpStorm.
 * User: kartik
 * Date: 2019-09-04
 * Time: 11:14
 */

namespace Bookings {

    use Bookings\Models\Company;
    use SilverStripe\Admin\ModelAdmin;

    /**
     * Class BookingAdmin
     * @package Bookings
     */
    class BookingAdmin extends ModelAdmin {
        private static $managed_models = [
            Company::class
        ];
        private static $url_segment = 'Bookings';
        private static $menu_title = 'My Booking Admin';
        private static $menu_icon_class = 'font-icon-book-open';
    }
}