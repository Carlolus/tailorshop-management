<!DOCTYPE html>
<html lang="<?php echo e(config('app.lang')); ?>"
      dir="<?php echo e(config('app.rtl') ? 'rtl' : 'ltr'); ?>"
      class="<?php echo e(setting()->getForCurrentUser('dark-mode-enabled') ? 'dark-mode ' : ''); ?><?php echo $__env->yieldContent('body-class'); ?>">
<head>
    <title><?php echo e(isset($pageTitle) ? $pageTitle . ' | ' : ''); ?><?php echo e(setting('app-name')); ?></title>

    <!-- Meta -->
    <meta name="viewport" content="width=device-width">
    <meta name="token" content="<?php echo e(csrf_token()); ?>">
    <meta name="base-url" content="<?php echo e(url('/')); ?>">
    <meta charset="utf-8">

    <!-- Social Cards Meta -->
    <meta property="og:title" content="<?php echo e(isset($pageTitle) ? $pageTitle . ' | ' : ''); ?><?php echo e(setting('app-name')); ?>">
    <meta property="og:url" content="<?php echo e(url()->current()); ?>">
    <?php echo $__env->yieldPushContent('social-meta'); ?>

    <!-- Styles and Fonts -->
    <link rel="stylesheet" href="<?php echo e(versioned_asset('dist/styles.css')); ?>">
    <link rel="stylesheet" media="print" href="<?php echo e(versioned_asset('dist/print-styles.css')); ?>">

    <?php echo $__env->yieldContent('head'); ?>

    <!-- Custom Styles & Head Content -->
    <?php echo $__env->make('common.custom-styles', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    <?php echo $__env->make('common.custom-head', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>

    <?php echo $__env->yieldPushContent('head'); ?>

    <!-- Translations for JS -->
    <?php echo $__env->yieldPushContent('translations'); ?>
</head>
<body class="<?php echo $__env->yieldContent('body-class'); ?>">

    <?php echo $__env->make('common.skip-to-content', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    <?php echo $__env->make('common.notifications', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    <?php echo $__env->make('common.header', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>

    <div id="content" components="<?php echo $__env->yieldContent('content-components'); ?>" class="block">
        <?php echo $__env->yieldContent('content'); ?>
    </div>

    <?php echo $__env->make('common.footer', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>

    <div back-to-top class="primary-background print-hidden">
        <div class="inner">
            <?php echo icon('chevron-up'); ?> <span><?php echo e(trans('common.back_to_top')); ?></span>
        </div>
    </div>

    <?php echo $__env->yieldContent('bottom'); ?>
    <script src="<?php echo e(versioned_asset('dist/app.js')); ?>" nonce="<?php echo e($cspNonce); ?>"></script>
    <?php echo $__env->yieldContent('scripts'); ?>

</body>
</html>
<?php /**PATH /var/www/bookstack/resources/views/layouts/base.blade.php ENDPATH**/ ?>