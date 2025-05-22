<?php $__env->startPush('head'); ?>
    <script src="<?php echo e(url('/libs/tinymce/tinymce.min.js?ver=5.10.2')); ?>" nonce="<?php echo e($cspNonce); ?>"></script>
<?php $__env->stopPush(); ?>

<div component="wysiwyg-editor"
     option:wysiwyg-editor:language="<?php echo e(config('app.lang')); ?>"
     option:wysiwyg-editor:page-id="<?php echo e($model->id ?? 0); ?>"
     option:wysiwyg-editor:text-direction="<?php echo e(config('app.rtl') ? 'rtl' : 'ltr'); ?>"
     option:wysiwyg-editor:image-upload-error-text="<?php echo e(trans('errors.image_upload_error')); ?>"
     option:wysiwyg-editor:server-upload-limit-text="<?php echo e(trans('errors.server_upload_limit')); ?>"
     class="flex-fill flex">

    <textarea id="html-editor"  name="html" rows="5"
          <?php if($errors->has('html')): ?> class="text-neg" <?php endif; ?>><?php if(isset($model) || old('html')): ?><?php echo e(old('html') ? old('html') : $model->html); ?><?php endif; ?></textarea>
</div>

<?php if($errors->has('html')): ?>
    <div class="text-neg text-small"><?php echo e($errors->first('html')); ?></div>
<?php endif; ?>

<?php echo $__env->make('pages.parts.editor-translations', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/bookstack/resources/views/pages/parts/wysiwyg-editor.blade.php ENDPATH**/ ?>