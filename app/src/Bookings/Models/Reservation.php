<?php
/**
 * Created by PhpStorm.
 * User: kartik
 * Date: 2019-09-04
 * Time: 15:40
 */

namespace Bookings\Models {

    use SilverStripe\ORM\DataObject;
    use SilverStripe\ORM\FieldType\DBDatetime;

    /**
     * Class Reservation
     * @package Bookings\Models
     * @property DBDatetime $StartDate
     * @property DBDatetime $EndDate
     * @property Boolean $ExistingClient
     * @property string TempClient
     * @property Boolean $BlockSpace
     * @property string $Notes
     */
    class Reservation extends DataObject {
        private static $table_name = "Reservation";
        private static $singular_name = "Reservation";
        private static $plurarl_name = "Reservations";

        private static $db = [
            'StartDate' => 'DBDatetime',
            'EndDate' => 'DBDatetime',
            'ExistingClient' => 'Boolean',
            'TempClient' => 'Varchar(256)',
            'BlockSpace' => 'Boolean',
            'Notes' => 'Text'
        ];

        private static $has_one = [
            'Room' => Room::class
        ];

        private static $summary_fields = [
            'Room.Name' => 'Room',
            'StartDate',
            'EndDate'
        ];
    }
}