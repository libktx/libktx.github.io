// WARNING: Made by a backend developer. Read at your own risk.

$(document).ready(function () {
    var currentModule = 'ktx-actors';
    var dependencySchema = getGradleDependency;

    function getGradleDependency(module) {
        return "// " + module + ":\n" +
            "compile group: 'com.github.czyzby', name: '" + module + "', version: ktxVersion";
    }

    function getMavenDependency(module) {
        return "<!-- " + module + " -->\n" +
            "<dependency>\n" +
            "    <groupId>com.github.czyzby</groupId>\n" +
            "    <artifactId>" + module + "</artifactId>\n" +
            "    <version>${ktx.version}</version>\n" +
            "</dependency>";
    }

    $('#module-select').find('a').click(function () {
        currentModule = $(this).text();
        refreshDependencyDeclaration();
    });

    $('.module-link').click(function () {
        currentModule = $(this).data('module')
        refreshDependencyDeclaration();
    });

    $('#dependency-gradle').click(function () {
        dependencySchema = getGradleDependency;
        $(this).addClass('active');
        $('#dependency-maven').removeClass('active');
        refreshDependencyDeclaration();
    });

    $('#dependency-maven').click(function () {
        dependencySchema = getMavenDependency;
        $(this).addClass('active');
        $('#dependency-gradle').removeClass('active');
        refreshDependencyDeclaration();
    });

    function refreshDependencyDeclaration() {
        $('#dependency-code').text(dependencySchema(currentModule));
    }

    refreshDependencyDeclaration();

    $(".navbar a, footer a, .module-link").click(function (event) {
        if (this.hash !== '') {
            event.preventDefault();
            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function () {
                window.location.hash = hash;
            });
        }
    });

    $(".scroll-top").click(function () {
        $("html, body").animate({scrollTop: 0}, 900);
    })
})