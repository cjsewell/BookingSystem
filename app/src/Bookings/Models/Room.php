<?php
/**
 * Created by PhpStorm.
 * User: kartik
 * Date: 2019-09-04
 * Time: 13:09
 */

namespace Bookings\Models {

    use SilverStripe\ORM\DataObject;

    /**
     * Class Room
     * @package Bookings\Models
     * @property string $Name
     */
    class Room extends DataObject {
        private static $table_name = "Room";
        private static $singular_name = "Room";
        private static $plurarl_name = "Rooms";

        private static $db = [
            'Name' => 'Varchar(256)'
        ];

        private static $summary_fields = [
            'Name'
        ];

        private static $has_one = [
            'Company' => Company::class
        ];

        private static $has_many = [
            'Reservations' => Reservation::class
        ];
    }
}