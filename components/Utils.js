const BGChanger = function(props) {
        const wraper = document.body.getElementsByClassName('wraper')[0].style;
        wraper.width="100%";
        wraper.height="90vh";
        wraper.backgroundImage="url('" + props + "')";
        wraper.backgroundRepeat="no-repeat";
        wraper.backgroundSize="cover";
};

exports.BGChanger = BGChanger;