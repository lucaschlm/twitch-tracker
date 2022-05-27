<?php
// ~/php/tp1/model/StreamerModel.php

class StreamerModel extends Database
{
    public function getStreamersFromName($name)
    {
        return $this->select("SELECT * FROM streamers AS st
        INNER JOIN `streamers-stats` AS stst ON st.id = stst.streamer
        WHERE st.name = ?;", ["s", $name]);
    }

    public function getStreamersFromDate($date)
    {
        $date_parse = date_parse_from_format("n.Y", $date);
        return $this->select(("SELECT * FROM streamers AS st
        INNER JOIN `streamers-stats` AS stst ON st.id = stst.streamer
        WHERE MONTH(stst.date) = ? AND YEAR(stst.date) = ?;"), ["ii", $date_parse["month"], $date_parse["year"]]);
    }
}
