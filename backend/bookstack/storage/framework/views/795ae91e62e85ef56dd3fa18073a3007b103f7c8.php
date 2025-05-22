<?php $__env->startSection('content'); ?>

    <div class="container very-small">

        <div class="my-l">&nbsp;</div>

        <div class="card content-wrap auto-height">
            <h1 class="list-heading"><?php echo e(Str::title(trans('auth.log_in'))); ?></h1>

            <?php echo $__env->make('auth.parts.login-form-' . $authMethod, \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>

            <?php if(count($socialDrivers) > 0): ?>
                <hr class="my-l">
                <?php $__currentLoopData = $socialDrivers; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $driver => $name): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <div>
                        <a id="social-login-<?php echo e($driver); ?>" class="button outline svg" href="<?php echo e(url("/login/service/" . $driver)); ?>">
                            <?php echo icon('auth/' . $driver); ?>
                            <span><?php echo e(trans('auth.log_in_with', ['socialDriver' => $name])); ?></span>
                        </a>
                    </div>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            <?php endif; ?>

            <?php if(setting('registration-enabled') && config('auth.method') === 'standard'): ?>
                <div class="text-center pb-s">
                    <hr class="my-l">
                    <a href="<?php echo e(url('/register')); ?>"><?php echo e(trans('auth.dont_have_account')); ?></a>
                </div>
            <?php endif; ?>
        </div>
    </div>

<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.simple', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/bookstack/resources/views/auth/login.blade.php ENDPATH**/ ?>