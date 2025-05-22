<?php $__env->startSection('body'); ?>
    <div class="container medium">

        <?php echo $__env->make('settings.parts.navbar', ['selected' => 'settings'], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>

        <div class="grid gap-xxl right-focus">

            <div>
                <h5><?php echo e(trans('settings.categories')); ?></h5>
                <nav class="active-link-list in-sidebar">
                    <a href="<?php echo e(url('/settings/features')); ?>" class="<?php echo e($category === 'features' ? 'active' : ''); ?>"><?php echo icon('star'); ?> Features & Security</a>
                    <a href="<?php echo e(url('/settings/customization')); ?>" class="<?php echo e($category === 'customization' ? 'active' : ''); ?>"><?php echo icon('palette'); ?> Customization</a>
                    <a href="<?php echo e(url('/settings/registration')); ?>" class="<?php echo e($category === 'registration' ? 'active' : ''); ?>"><?php echo icon('lock'); ?> Registration</a>
                </nav>

                <h5 class="mt-xl"><?php echo e(trans('settings.system_version')); ?></h5>
                <div class="py-xs">
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/BookStackApp/BookStack/releases">
                        BookStack <?php if(strpos($version, 'v') !== 0): ?> version <?php endif; ?> <?php echo e($version); ?>

                    </a>
                </div>
            </div>

            <div>
                <div class="card content-wrap auto-height">
                    <?php echo $__env->yieldContent('card'); ?>
                </div>
            </div>

        </div>

    </div>

    <?php echo $__env->yieldContent('after-content'); ?>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.simple', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/bookstack/resources/views/settings/layout.blade.php ENDPATH**/ ?>